import { useRef } from 'react';
import {
  Button,
  Container,
  Flex,
  Heading,
  Section,
  Text,
} from '@radix-ui/themes';
import { Link } from 'react-router';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';
import { registerProps, type RegisterProps } from '@/types/RegisterTypes';

const Register = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const mutation = useMutation<AxiosResponse, AxiosError, RegisterProps>({
    mutationFn: (data: RegisterProps) =>
      axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/register`, data, {
        withCredentials: true,
      }),
    onSuccess: () => {
      toast.success('Registration successful! You can now login');
      formRef.current?.reset();

      navigate('/login', { replace: true });
    },
    onError: (error: AxiosError) => {
      alert(error?.message ?? 'Unknown error');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const data: RegisterProps = {
      name: (formData.get('name') as string) ?? '',
      email: (formData.get('email') as string) ?? '',
      password: (formData.get('password') as string) ?? '',
    };

    // Zod validation
    const result = registerProps.safeParse(data);
    if (!result.success) {
      const validationErrors = result.error.issues.map(
        (issue) => issue.message
      );
      alert(validationErrors.join('\n'));
      return;
    }

    mutation.mutate(data);
  };

  return (
    <Section size="3" className="px-4 h-152.25 flex items-center bg-slate-100">
      <Container size="4">
        <Flex
          direction="column"
          align="center"
          className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto"
        >
          <Heading size="6" weight="medium" className="pb-2 text-center">
            Create an Account
          </Heading>

          <Text size="2" className="pb-6 text-gray-600 text-center">
            Register to manage your legal cases efficiently
          </Text>

          {/* Server errors */}
          {mutation.status === 'error' && (
            <Text size="2" className="text-red-600 mb-2 text-center">
              {mutation.error?.message ?? 'Unknown error'}
            </Text>
          )}

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-4"
          >
            <Flex direction="column" gap="1">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="border rounded-md p-2 text-gray-700"
              />
            </Flex>

            <Flex direction="column" gap="1">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="border rounded-md p-2 text-gray-700"
              />
            </Flex>

            <Flex direction="column" gap="1">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="border rounded-md p-2 text-gray-700"
              />
            </Flex>

            <Button
              type="submit"
              size="3"
              mb="4"
              disabled={mutation.status === 'pending'}
            >
              {mutation.status === 'pending' ? 'Registering...' : 'Register'}
            </Button>
          </form>

          <Text size="2" className="mt-4 text-gray-600 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 underline">
              Login
            </Link>
          </Text>
        </Flex>
      </Container>
    </Section>
  );
};

export default Register;
