import {
  IconShieldCheck,
  IconChecklist,
  IconMessageCircle,
  IconShoppingCart,
  IconUsersGroup,
  IconTool,
} from "@tabler/icons-react";

export const ECOSYSTEM_INFO = [
  {
    id: 1,
    title: "Authentication",
    description:
      "Secure authentication system with JWT, 2FA, email verification, password recovery, role management, and OAuth login.",
    icon: IconShieldCheck,
    link: "/apis/authentication",
  },
  {
    id: 2,
    title: "Todo",
    description:
      "Task management API with full CRUD support, soft delete/restore, and status toggle functionality.",
    icon: IconChecklist,
    link: "/apis/todo",
  },
  {
    id: 3,
    title: "Chat App",
    description:
      "Real-time chat API with private messaging, group management, and full message lifecycle control.",
    icon: IconMessageCircle,
    link: "/apis/chat",
  },
  {
    id: 4,
    title: "E-commerce",
    description:
      "Complete e-commerce API with product management, cart, orders, payments, reviews, and wishlist functionality.",
    icon: IconShoppingCart,
    link: "/apis/ecommerce",
  },
  {
    id: 5,
    title: "Social Media App",
    description:
      "Social media API with posts, comments, likes, bookmarks, profiles, and follow-based feeds.",
    icon: IconUsersGroup,
    link: "/apis/social-media",
  },
  {
    id: 6,
    title: "Utility APIs",
    description:
      "Utility APIs for testing HTTP behavior, compression, status codes, and redirects.",
    icon: IconTool,
    link: "/apis/utility",
  },
];
