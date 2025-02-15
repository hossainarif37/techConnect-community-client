import Login from "@/components/layouts/AuthLayout/components/Login/Login"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface AuthModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export function AuthModal({ open, setOpen }: AuthModalProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Login />
            </DialogContent>
        </Dialog>
    )
}
