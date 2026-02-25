import { Link, useNavigate } from 'react-router';
import { useRegister } from '../api/authApi.js';
import { useUserContext } from '../context/UserContext.jsx';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { showToast } from '../utils/toastUtils.js';
import { useState } from 'react';

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  repeatPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Please confirm your password')
})

const RegisterPage = () => {
  const { register: registerUser, isPending } = useRegister();
  const { userLoginHandler } = useUserContext();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm({
    resolver: yupResolver(schema)
  })

  const registerHandler = async (data) => {
    try {
      const authData = await registerUser(data.firstName, data.lastName, data.email, data.password)

      showToast('Registration successful! Redirecting...', 'success')

      userLoginHandler(authData)

      navigate('/dashboard')
    } catch (error) {
      showToast(error.message || 'Registration failed. Please try again,', 'error')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-100 font-sans">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="inline-block w-12 h-12 bg-linear-to-r from-teal-400 via-cyan-400 to-indigo-500 rounded-xl mb-4 shadow-[0_0_20px_rgba(20,184,166,0.3)]"></div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-teal-300 to-indigo-300 bg-clip-text text-transparent">
            Join the Future
          </h1>
          <p className="text-slate-400 mt-2">Create your account to start analyzing</p>
        </div>

        <form onSubmit={handleSubmit(registerHandler)} className="space-y-4" noValidate>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                {...register('firstName')}
                aria-invalid={!!errors.firstName}
                placeholder="John"
                autoComplete='firstName'
                required
              />
            </div>
            {errors.firstName && (
              <p className="mt-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {errors.firstName.message}
              </p>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                {...register('lastName')}
                aria-invalid={!!errors.lastName}
                placeholder="Doe"
                autoComplete='lastName'
                required
              />
            </div>
            {errors.lastName && (
              <p className="mt-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
              {...register('email')}
              aria-invalid={!!errors.email}
              placeholder="john@example.com"
              autoComplete='email'
              required
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {errors.email.message}
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Password
            </label>
          
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 pr-12 text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
                {...register('password')}
                aria-invalid={!!errors.password}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
          
              {/* Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-violet-400 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  // Eye Off Icon
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.042-3.368M6.343 6.343A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.953 9.953 0 01-4.293 5.164M6.343 6.343L3 3m3.343 3.343l11.314 11.314" />
                  </svg>
                ) : (
                  // Eye Icon
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          
            {errors.password && (
              <p className="mt-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Repeat Password
            </label>
          
            <div className="relative">
              <input
                type={showRepeatPassword ? "text" : "password"}
                name="repeatPassword"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 pr-12 text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                {...register('repeatPassword')}
                aria-invalid={!!errors.repeatPassword}
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
          
              {/* Toggle Button */}
              <button
                type="button"
                onClick={() => setShowRepeatPassword(prev => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-teal-400 transition-colors"
                tabIndex={-1}
                aria-label="Toggle repeat password visibility"
              >
                {showRepeatPassword ? (
                  // Eye Off
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.042-3.368M6.343 6.343A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.953 9.953 0 01-4.293 5.164M6.343 6.343L3 3m3.343 3.343l11.314 11.314" />
                  </svg>
                ) : (
                  // Eye
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          
            {errors.repeatPassword && (
              <p className="mt-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {errors.repeatPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isPending}
            className="w-full mt-4 bg-linear-to-r from-teal-400 via-cyan-400 to-indigo-500 hover:from-teal-500 hover:via-cyan-500 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-teal-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || isPending ? 'Creating Account...' : 'Get Started'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-slate-400">
            Already have an account?{' '}
            <Link to='/login' className="text-teal-400 hover:text-teal-300 font-medium transition-colors cursor-pointer">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
