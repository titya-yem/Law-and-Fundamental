import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const downloadBackUp = async (format: "sql" | "dump") => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/backup?format=${format}`,
    {
      withCredentials: true,
      responseType: "blob",
    }
  );

  return res.data;
};

export const useBackup = () => {
  return useMutation({
    mutationFn: (format: "sql" | "dump") => downloadBackUp(format),

    onSuccess: (blob, format) => {
      const url = globalThis.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `backup.${format}`;
      a.click();
      globalThis.URL.revokeObjectURL(url);
    },

    onError: (err) => {
      console.error("Backup failed:", err);
      alert("Backup failed");
    },
  });
};