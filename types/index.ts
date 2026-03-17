import type { ReactNode, ElementType } from "react";

export type HeadingProps = {
  label: string;
  title?: string;
  description?: string;
  className?: string;
};

export type TechCardProps = {
  name: string;
  Icon: React.ElementType;
};

export type ContainerProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

export type LabelProps = {
  label: string;
};

export type OnClickProps = {
  onClick?: () => void;
};

export type IconButtonProps = {
  to?: string;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
};

export type EcosystemCardType = {
  id: number;
  title: string;
  description: string;
  icon: ElementType;
  link: string;
};

export type EcosystemCardProps = {
  item: EcosystemCardType;
};

export type DescriptionProps = {
  children: ReactNode;
  className?: string;
};

export type FeatureCardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
};

export type SectionProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export interface InputFieldProps {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SocialLoginButtonProps {
  iconSrc: string;
  label: string;
  onClick?: () => void;
}

export interface AuthTextProps {
  text: string;
  linkText: string;
  linkTo: string;
  className?: string;
}

export interface AlertProps {
  type: "success" | "error";
  message: string;
  onClose?: () => void;
}

export interface AuthButton {
  label?: string;
  onClick?: () => void;
  loading?: boolean;
}
