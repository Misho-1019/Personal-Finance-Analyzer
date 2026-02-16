import { Link, useNavigate } from 'react-router';
import { useLogin } from '../api/authApi.js';
import { useUserContext } from '../context/UserContext.jsx';
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isPending } = useLogin()
  const { userLoginHandler } = useUserContext()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const loginHandler = async (data) => {
    try {
      const authData = await login(data.email, data.password)

      userLoginHandler(authData)

      toast.success('Login successful! Redirecting...', {
        position: 'top-center',
        autoClose: 2000,
        theme: 'colored'
      })

      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message || 'Login failed. Please try again.', {
        position: 'top-center',
        autoClose: 2000,
        theme: 'colored'
      })
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-100 font-sans">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="inline-block w-12 h-12 bg-linear-to-r from-indigo-500 via-violet-500 to-cyan-500 rounded-xl mb-4 shadow-[0_0_20px_rgba(99,102,241,0.4)]"></div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-slate-400 mt-2">Sign in to your financial command center</p>
        </div>

        <form onSubmit={handleSubmit(loginHandler)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
            <input
              type="email"
              name='email'
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
              {...register('email')}
              aria-invalid={!!errors.email}
              placeholder="misho@finance.com"
              autoComplete='email'
              required
            />
            {errors.email && (
              <p className='mt-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2'>
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
            <input
              type="password"
              name='password'
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
              {...register('password')}
              aria-invalid={!!errors.password}
              placeholder="••••••••"
              autoComplete='current-password'
              required
            />
          {errors.password && (
            <p className="mt-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {errors.password.message}
            </p>
          )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isPending}
            className="w-full bg-linear-to-r from-indigo-500 via-violet-500 to-cyan-500 hover:from-indigo-600 hover:via-violet-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || isPending ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : (
              'Authenticate'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-slate-400">
            Don't have an account?{' '}
            <Link to='/register' className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
