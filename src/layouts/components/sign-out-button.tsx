import type { ButtonProps } from "@mui/material/Button";

import { useCallback } from "react";
import { useClerk } from "@clerk/clerk-react";

import Button from "@mui/material/Button";

import { useRouter } from "src/routes/hooks";

import { toast } from "src/components/snackbar";

type Props = ButtonProps & {
  onClose?: () => void;
};

export function SignOutButton({ onClose, sx, ...other }: Props) {
  const router = useRouter();
  const { signOut } = useClerk();

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      onClose?.();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Unable to logout!");
    }
  }, [onClose, router, signOut]);

  return (
    <Button
      fullWidth
      variant="soft"
      size="large"
      color="error"
      onClick={handleLogout}
      sx={sx}
      {...other}
    >
      Sair
    </Button>
  );
}
