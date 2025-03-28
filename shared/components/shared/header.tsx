"use client";

import { cn } from "@/shared/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import {
  AuthModal,
  CartButton,
  Container,
  ProfileButton,
  SearchInput,
} from ".";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  hasSearch?: boolean;
  hasCartButton?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({
  hasSearch = true,
  hasCartButton = true,
  className,
}) => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("paid")) {
      setTimeout(
        () =>
          toast.success(
            "Заказ успешно оплачен! Информация отправлена на почту.",
          ),
        500,
      );
    }
  }, []);

  return (
    <header className={cn("border-b border-gray-200", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левая часть  */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="" width={35} height={35} />
            <div>
              <h1 className="text-2xl font-black uppercase">Pizza Slice</h1>
              <p className="text-sm leading-3 text-gray-400">
                Вкусней уже некуда!
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Правая часть  */}
        <div className="flex items-center gap-3">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />
          
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {hasCartButton && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
