import { useNavigate } from "react-router-dom"

export const useDelayedNavigation = (delay: number) => {
  const navigate = useNavigate();

  return (address?: string) => setTimeout(() => {
    if (address) {
      return navigate(address)
    }
    navigate(-1);
  }, delay)
}