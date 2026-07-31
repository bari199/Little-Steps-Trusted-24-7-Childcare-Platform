import { Loader2 } from "lucide-react";

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />

      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
};

export default Loading;
