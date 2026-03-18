"use client";

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const formatUsername = (username?: string | null) => {
  if (!username) return "Guest";

  const clean = username.split("_")[0];

  return clean
    .replace(/\d+/g, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};
