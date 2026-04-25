import {Link, useNavigate} from 'react-router-dom';
import {useState} from "react";
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

import Button from "../../components/Button.tsx";
import {fetchUserLogin} from "../../api/auth.api.ts";
import {setToken} from "../../utils/auth.utils.ts";
import {getErrorMessage} from "../../utils/getErrorMessage.ts";
import AuthForm from "../../components/auth/AuthForm.tsx";
import EyeShowIcon from "../../assets/icons/eye-show.svg?react";
import EyeHideIcon from "../../assets/icons/eye-hide.svg?react";
import {FormField} from "../../components/auth";

const inputClassName = "mb-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black";
const passwordIconClassName = "absolute h-5 w-5 bottom-4 right-2";
const schema = z
  .object({
    email: z.email({error: "Email 格式不正確"}),
    password: z.string().min(8, {message: '請輸入至少 8 碼的密碼'}),
    rememberMe: z.boolean()
  });

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const rememberedEmail =  localStorage.getItem("rememberedEmail") ?? "";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: rememberedEmail,
      rememberMe: Boolean(rememberedEmail),
    }
  });
  const handleLogin: SubmitHandler<FormData> = async(formData) => {
    try {
      setLoading(true);
      const {email, password, rememberMe} = formData;

      // fetch login API
      const res = await fetchUserLogin({
        email,
        password
      });
      if (res.success) {
        const { data } = res;
        // handle rememberedMe
        setToken(data.token, rememberMe);
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        navigate('/services');
      }
    } catch(err) {
      setLoginError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };
  return <>
    {/* wrapper */}
    <AuthForm
      title="開始你的預約"
      description="請輸入你的郵件與密碼"
      footer={<>
        <p className="mt-4 flex justify-center text-gray-500 text-sm">
          還沒加入嗎？
          <Link to="/register" className="ml-1 font-medium text-blue-500">
            現在免費註冊吧！
          </Link>
        </p>
      </>}
    >
      <form onSubmit={handleSubmit(handleLogin)}>
        <FormField
          label="信箱"
          htmlFor="email"
          error={errors.email?.message}
          required={true}
        >
          <input
            {...register('email', { required: true })}
            id="email"
            placeholder="請輸入信箱"
            className={inputClassName}
          />
        </FormField>
        <FormField
          label="密碼"
          htmlFor="password"
          required={true}
          error={errors.password?.message}
        >
          <div className="relative">
            <input
              {...register('password', {required: true})}
              id="password"
              placeholder="請輸入密碼"
              type={isPasswordVisible ? "text" :"password"}
              className={inputClassName}
            >
            </input>
            <button
              type="button"
              onClick={() => setIsPasswordVisible(prev => !prev)}
              className="text-gray-700 font-medium"
            >
              {isPasswordVisible
                ? <EyeHideIcon className={passwordIconClassName}/>
                : <EyeShowIcon className={passwordIconClassName}/>
              }
            </button>
          </div>
        </FormField>
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="remember-me">
            <input
              {...register('rememberMe')}
              className="mr-2"
              id="remember-me"
              type={"checkbox"}/>
            記住我
          </label>
          <a
            className="cursor-not-allowed inline-block align-baseline text-sm text-gray-500 hover:text-gray-800"
             href="#"
          >
            忘記密碼？
          </a>
        </div>
        {loginError && <p className="mt-2 flex justify-center text-red-500 text-sm">{loginError}</p>}
        <Button
          className="mt-4 mx-auto block"
          disabled={loading}
          type="submit"
        >
          登入
        </Button>
      </form>
    </AuthForm>
  </>
};

export default LoginPage;