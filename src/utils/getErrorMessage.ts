import ApiError from "../api/errors";

const getErrorMessage = (err: unknown): string => {
  if (err instanceof ApiError) {
    switch (err.type) {
      // auth error
      case "auth/invalid-credentials":
        return "帳號或密碼錯誤";

      case "auth/token-expired":
        return "登入已過期，請重新登入";

      case "auth/unauthorized":
        return "請先登入";

      // register
      case "user/email-conflict":
        return "此 Email 已被註冊";

      default:
        if (err.status >= 500) {
          return "系統暫時發生問題，請稍後再試";
        }

        return "操作失敗，請稍後再試";
    }
  }

  return "發生未知錯誤，請稍後再試";
};

export {
  getErrorMessage
};