import type { HTMLAttributes } from 'react';

export default function SvgIcon({
  icon,
  fill = 'currentColor',
  ...props
}: { icon: string; fill?: string } & HTMLAttributes<SVGElement>) {
  const [dir, name] = icon.split('/');
  const id = name ? `${dir}/${name}` : `/${dir}`;
  const symbolId = `#icon-${id}`;

  return (
    <svg {...props}>
      <use href={symbolId} fill={fill} />
    </svg>
  );
}
