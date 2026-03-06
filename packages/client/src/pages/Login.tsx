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
import axios, { type AxiosError, type AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import { loginProps, type LoginProps } from '@/types/LoginTypes';
import type { User } from '@/hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();

  const loginMutation = useMutation<AxiosResponse, AxiosError, LoginProps>({
    mutationFn: (data) =>
      axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, data, {
        withCredentials: true,
      }),

    onSuccess: () => {
      toast.success('Login successful 🎉');

      formRef.current?.reset();

      const token = Cookies.get('token');
      if (token) {
        try {
          const decodedUser = jwtDecode<User>(token);
          queryClient.setQueryData(['me'], decodedUser);
        } catch {
          console.warn('JWT decode failed');
        }
      }

      navigate('/dashboard', { replace: true });
    },

    onError: (error) => {
      toast.error(error.message ?? 'Login failed');
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
      const errors = validation.error.issues.map((issue) => issue.message);
      alert(errors.join('\n'));
      return;
    }

    loginMutation.mutate(payload);
  };

  return (
    <Section size="3" className="px-4 flex items-center h-152.25 bg-slate-100">
      <Container size="4">
        <Flex
          direction="column"
          align="center"
          className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto"
        >
          <Heading size="6" weight="medium" className="text-center pb-2">
            Welcome Back
          </Heading>

          <Text size="2" className="text-gray-600 text-center pb-6">
            Login to manage your legal cases
          </Text>

          {loginMutation.isError && (
            <Text size="2" className="text-red-600 text-center mb-2">
              {loginMutation.error?.message ?? 'Login failed'}
            </Text>
          )}

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full"
          >
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="border rounded-md p-2 text-gray-700"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border rounded-md p-2 text-gray-700"
            />

            <Button type="submit" size="3" disabled={loginMutation.isPending}>
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
