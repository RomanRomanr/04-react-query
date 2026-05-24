import css from './ErrorMessage.module.css'

interface ErrorMessageProps {
  message: string;
}
const ErrorMessage = ({message}: ErrorMessageProps) => {
  return <p className={css.text}>{message}</p>;
};

export default ErrorMessage;