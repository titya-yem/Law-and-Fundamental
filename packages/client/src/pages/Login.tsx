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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';
import { loginProps, type LoginProps } from '@/types/LoginTypes';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import type { User } from '@/hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient(); // React Query client

  const mutation = useMutation<AxiosResponse, AxiosError, LoginProps>({
    mutationFn: (data: LoginProps) =>
      axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, data, {
        withCredentials: true,
      }),
    onSuccess: () => {
      toast.success('Login successful 🎉');
      formRef.current?.reset();

      // Update `me` query immediately
      const token = Cookies.get('token');
      if (token) {
        try {
          const decodedUser = jwtDecode<User>(token);
          queryClient.setQueryData(['me'], decodedUser);
        } catch {
          console.warn('Failed to decode JWT');
        }
      }

      navigate('/dashboard', { replace: true });
    },
    onError: (error: AxiosError) => {
      alert(error.message ?? 'Login failed');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const data: LoginProps = {
      email: (formData.get('email') as string) ?? '',
      password: (formData.get('password') as string) ?? '',
    };

    const result = loginProps.safeParse(data);
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
    <Section size="3" className="px-4 bg-slate-100 flex items-center h-125">
      <Container size="4">
        <Flex
          direction="column"
          align="center"
          className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto"
        >
          <Heading size="6" weight="medium" className="pb-2 text-center">
            Welcome Back
          </Heading>

          <Text size="2" className="pb-6 text-gray-600 text-center">
            Login to manage your legal cases
          </Text>

          {mutation.status === 'error' && (
            <Text size="2" className="text-red-600 mb-2 text-center">
              {mutation.error?.message ?? 'Login failed'}
            </Text>
          )}

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-4"
          >
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
              {mutation.status === 'pending' ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <Text size="2" className="mt-4 text-gray-600 text-center">
            Don’t have an account?{' '}
            <Link to="/register" className="text-blue-600 underline">
              Register
            </Link>
          </Text>
        </Flex>
      </Container>
    </Section>
  );
};

export default Login;
