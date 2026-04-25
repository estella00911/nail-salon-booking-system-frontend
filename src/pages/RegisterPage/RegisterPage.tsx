import {Link, useNavigate} from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import {useState} from "react";
import {AuthForm} from "../../components/auth";
import Button from "../../components/Button.tsx";
import EyeShowIcon from "../../assets/icons/eye-show.svg?react";
import EyeHideIcon from "../../assets/icons/eye-hide.svg?react";
import {fetchUserRegister} from "../../api/auth.api.ts";
import {setToken} from "../../utils/auth.utils.ts";
import {getErrorMessage} from "../../utils/getErrorMessage.ts";


const registerBaseSchema = z.object({
  name: z.string().min(2, { message: "名字至少需要 2 個字" }),
  email: z.email({ error: "Email 格式不正確" }),
  password: z.string().min(8, { message: "請輸入至少 8 碼的密碼" }),
  confirmedPassword: z.string().min(8, { message: "請輸入至少 8 碼的密碼" }),
  rememberMe: z.boolean(),
});

const schema = registerBaseSchema.refine(
  (data) => data.password === data.confirmedPassword,
  {
    message: "兩次輸入的密碼不一致",
    path: ["confirmedPassword"],
    when(payload) {
      return registerBaseSchema
        .pick({ password: true, confirmedPassword: true })
        .safeParse(payload.value).success;
    },
  }
);

type FormData = z.infer<typeof schema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const [isConfirmedPwdVisible, setIsConfirmedPwdVisible] = useState(false);
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState:{ errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmedPassword: "",
      rememberMe: false,
    }
  });

  const handleRegister: SubmitHandler<FormData> = async(formData) => {
    try {
      setLoading(true);
      const {name, email, password, rememberMe} = formData;
      console.log("form data: ", formData);
      // fetch login API
      const res = await fetchUserRegister({
        name,
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
      }
      navigate('/services');
    } catch(err) {
      setLoginError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return <>
    <AuthForm
      title="建立帳號"
      description="填寫資料開始使用"
      footer={<>
        已經有帳號？
        <Link to="/login" className="ml-1 font-medium">
          登入
        </Link>
      </>}
    >
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="w-full flex flex-col mb-6">
          <label htmlFor="name" className="flex items-center font-medium mb-1">
            名字<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            {...register('name', { required: true })}
            id="name"
            placeholder="請輸入名字"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name?.message}</p>}
        </div>
        <div className="w-full flex flex-col mb-6">
          <label htmlFor="email" className="flex items-center font-medium mb-1">
            信箱<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            {...register('email', { required: true })}
            id="email"
            placeholder="請輸入信箱"
            className="mb-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.name?.message && (
            <p className="text-red-500 text-sm">{String(errors.name.message)}</p>
          )}
        </div>
        <div className="relative flex flex-col mb-6">
          <label htmlFor="password" className="flex items-center font-medium mb-1">
            密碼<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            {...register('password', {required: true})}
            id="password"
            placeholder="請輸入密碼"
            type={isPwdVisible ? "text" : "password"}
            className="mb-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="button"
            onClick={() => setIsPwdVisible(prev => !prev)}
            className="text-gray-700 font-meidum"
          >
            {isPwdVisible
              ? <EyeHideIcon className="absolute h-5 w-5 top-10 right-2"/>
              : <EyeShowIcon className="absolute h-5 w-5 top-10 right-2"/>
            }
          </button>
          {errors.password?.message && (
            <p className="text-red-500 text-sm">{String(errors.password?.message)}</p>
          )}
        </div>
        <div className="relative flex flex-col mb-6">
          <label htmlFor="password" className="flex items-center font-medium mb-1">
            確認密碼<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            {...register('confirmedPassword', {required: true})}
            id="confirmedPassword"
            placeholder="請再次輸入密碼"
            type={isConfirmedPwdVisible ? "text" : "password"}
            className="mb-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="button"
            onClick={() => setIsConfirmedPwdVisible(prev => !prev)}
            className="text-gray-700 font-meidum"
          >
            {isConfirmedPwdVisible
              ? <EyeHideIcon className="absolute h-5 w-5 top-10 right-2"/>
              : <EyeShowIcon className="absolute h-5 w-5 top-10 right-2"/>
            }
          </button>
          {errors.confirmedPassword?.message && (
            <p className="text-red-500 text-sm">{String(errors.confirmedPassword?.message)}</p>
          )}
        </div>
        <div className="flex justify-between items-center gap-2">
          <div>
            <input
              {...register('rememberMe')}
              className="mr-2"
              id="remember-me"
              type={"checkbox"}
            />
            <label htmlFor="remember-me">
              記住我
            </label>
          </div>
          <span className="invisible">placeholder</span>
        </div>
        {loginError && <p className="flex justify-center text-red-500 text-sm">{loginError}</p>}
        <Button
          className="mt-4 mx-auto block"
          disabled={loading}
          type="submit"
        >
          註冊
        </Button>
      </form>
    </AuthForm>
  </>
};

export default RegisterPage;