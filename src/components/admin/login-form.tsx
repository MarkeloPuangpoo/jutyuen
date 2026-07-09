"use client";

import { useTransition, useState } from "react";
import { loginAdmin } from "@/actions/admin";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await loginAdmin(formData);
      if (!result?.success) {
        setError(result?.error || "เกิดข้อผิดพลาด");
      } else {
        setError(null);
        window.location.reload();
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg ring-1 ring-gray-900/5">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Admin Login</h2>
          <p className="mt-2 text-sm text-gray-500">ใส่รหัสผ่านเพื่อเข้าสู่ระบบ</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              name="password"
              placeholder="รหัสผ่าน..."
              required
              className="w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={isPending}
            className="flex w-full justify-center rounded-md bg-black px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-50"
          >
            {isPending ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>
      </div>
    </div>
  );
}
