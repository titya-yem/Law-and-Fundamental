import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const downloadBackUp = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/backup`,
    {
      withCredentials: true,
      responseType: "blob",
    }
  );

  return res.data;
};

export const useBackup = () => {
  return useMutation({
    mutationFn: downloadBackUp,

    onSuccess: (blob) => {
      const url = globalThis.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = "backup.json";

      document.body.appendChild(a);
      a.click();
      a.remove();

      globalThis.URL.revokeObjectURL(url);
    },

    onError: (err) => {
      console.error("Backup failed:", err);
      alert("Backup failed");
    },
  });
};