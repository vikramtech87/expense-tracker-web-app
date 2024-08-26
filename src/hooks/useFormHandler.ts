import { useState } from "react"

const useFormHandler = <T>(
  formHandler: (formData: T) => Promise<boolean>
): [boolean, (formData: T) => Promise<void>] => {
  const [isBusy, setIsBusy] = useState(false);

  const formHandlerWithBusyState = async (formData: T) => {
    setIsBusy(true);
    const isSuccess = await formHandler(formData);
    if(!isSuccess) {
      setIsBusy(false);
    }
  }

  return [isBusy, formHandlerWithBusyState];
}

export default useFormHandler;