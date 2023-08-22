const useRecaptcha = (actionType: string) => {
    const getRecaptchaToken = async () => {
      try {
        const token = await window.grecaptcha.execute(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          { action: actionType }
        );
        return token;
      } catch (error) {
        console.error(error);
        return null;
      }
    };
  
    return { getRecaptchaToken };
  };

  export default useRecaptcha;