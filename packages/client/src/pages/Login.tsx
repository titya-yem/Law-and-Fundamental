/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react';
import {
  Button,
  Container,
  Flex,
  Heading,
  Section,
  Text,
} from '@radix-ui/themes';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { loginProps, type LoginProps } from '@/types/LoginTypes';

const Login = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (data: LoginProps) => {
      return axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
        data,
        { withCredentials: true }
      );
    },

    onSuccess: async () => {
      toast.success('Login successful 🎉');
      formRef.current?.reset();

      await queryClient.invalidateQueries({ queryKey: ['auth'] });

      navigate('/', { replace: true });
    },

    onError: (error: AxiosError<any>) => {
      const message = error.response?.data?.message || 'Login failed ❌';
      toast.error(message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const payload: LoginProps = {
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
    };

    const validation = loginProps.safeParse(payload);

    if (!validation.success) {
      const errors = validation.error.issues.map((i) => i.message);
      toast.error(errors.join('\n'));
      return;
    }

    loginMutation.mutate(payload);
  };

  return (
    <Section size="3" className="px-4 flex items-center h-screen bg-slate-100">
      <Container size="4">
        <Flex
          direction="column"
          align="center"
          className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto"
        >
          <Heading size="6" className="text-center pb-2">
            Welcome Back
          </Heading>

          <Text size="2" className="text-gray-600 text-center pb-6">
            Login to manage your legal cases
          </Text>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full"
          >
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="border rounded-md p-2"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border rounded-md p-2"
              required
            />

            <Button type="submit" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? 'Logging in...' : 'Login'}
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
