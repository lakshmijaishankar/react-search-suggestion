import { FC, HTMLAttributes } from "react";

interface BreadCrumbsProps extends HTMLAttributes<HTMLElement> {}

const BreadCrumbs: FC<BreadCrumbsProps> = ({ children, ...props }) => {
  return <section {...props}>{children}</section>;
};

export default BreadCrumbs;
