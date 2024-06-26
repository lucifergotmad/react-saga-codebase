import { Link } from 'react-router-dom';
import { IconChevronDown } from '@tabler/icons-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/design/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/design/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/design/tooltip';
import { Button } from '@/shared/components/design/button';
import { buttonVariants } from '@/shared/components/design/types';
import { useCheckActiveUrl, SideLink } from '@/shared';
import { cn } from '@/utils';

interface SideNavProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
  links: SideLink[];
  closeNav: () => void;
}

export const SideNav = ({
  links,
  isCollapsed,
  className,
  closeNav,
}: SideNavProps) => {
  const renderLink = ({ sub, ...rest }: SideLink) => {
    const key = `${rest.title}-${rest.href}`;
    if (isCollapsed && sub)
      return (
        <NavLinkIconDropdown
          {...rest}
          sub={sub}
          key={key}
          closeNav={closeNav}
        />
      );

    if (isCollapsed)
      return <NavLinkIcon {...rest} key={key} closeNav={closeNav} />;

    if (sub) {
      return (
        <NavLinkDropdown {...rest} sub={sub} key={key} closeNav={closeNav} />
      );
    }

    return <NavLink {...rest} key={key} closeNav={closeNav} />;
  };
  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        'group border-b bg-background py-2 transition-[max-height,padding] duration-500 data-[collapsed=true]:py-2 md:border-none',
        className,
      )}
    >
      <TooltipProvider delayDuration={0}>
        <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map(renderLink)}
        </nav>
      </TooltipProvider>
    </div>
  );
};

interface NavLinkProps extends SideLink {
  subLink?: boolean;
  closeNav: () => void;
}

function NavLink({
  title,
  icon,
  label,
  href,
  closeNav,
  subLink = false,
}: NavLinkProps) {
  const { checkActiveUrl } = useCheckActiveUrl();
  return (
    <Link
      to={href}
      onClick={closeNav}
      className={cn(
        buttonVariants({
          variant: checkActiveUrl(href) ? 'secondary' : 'ghost',
          size: 'sm',
        }),
        'h-12 justify-start text-wrap rounded-none px-6',
        subLink && 'h-10 w-full border-l border-l-slate-500 px-2',
      )}
      aria-current={checkActiveUrl(href) ? 'page' : undefined}
    >
      <div className="mr-2">{icon}</div>
      {title}
      {label && (
        <div className="ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground">
          {label}
        </div>
      )}
    </Link>
  );
}

function NavLinkDropdown({
  title,
  icon,
  label,
  sub,
  closeNav,
  subLink,
}: NavLinkProps) {
  const { checkActiveUrl } = useCheckActiveUrl();
  const isChildActive = !!sub?.find((s) => checkActiveUrl(s.href));

  return (
    <Collapsible defaultOpen={isChildActive}>
      <CollapsibleTrigger
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          'group h-12 w-full justify-start rounded-none',
          subLink ? 'pr-6' : 'px-6',
          subLink && 'h-10 border-l border-l-slate-500',
        )}
        aria-current={checkActiveUrl('') ? 'page' : undefined}
      >
        <div className="mr-2">{icon}</div>
        {title}
        {label && (
          <div className="ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground">
            {label}
          </div>
        )}
        <span
          className={cn(
            'ml-auto transition-all group-data-[state="open"]:-rotate-180',
          )}
        >
          <IconChevronDown stroke={1} />
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="collapsibleDropdown" asChild>
        <ul>
          {sub?.map((sublink, index) => (
            <li key={sublink.href} className="my-1 ml-8">
              {sublink.sub ? (
                <NavLinkDropdown
                  {...sublink}
                  sub={sublink.sub}
                  key={index}
                  subLink
                  closeNav={closeNav}
                />
              ) : (
                <NavLink {...sublink} subLink closeNav={closeNav} />
              )}
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

function NavLinkIcon({ title, icon, label, href }: NavLinkProps) {
  const { checkActiveUrl } = useCheckActiveUrl();
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          to={href}
          className={cn(
            buttonVariants({
              variant: checkActiveUrl(href) ? 'secondary' : 'ghost',
              size: 'icon',
            }),
            'h-12 w-12',
          )}
        >
          {icon}
          <span className="sr-only">{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        {title}
        {label && (
          <span className="ml-auto text-muted-foreground">{label}</span>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

function NavLinkIconDropdown({ title, icon, label, sub }: NavLinkProps) {
  const { checkActiveUrl } = useCheckActiveUrl();

  const isChildActive = !!sub?.find((s) => checkActiveUrl(s.href));

  return (
    <DropdownMenu>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant={isChildActive ? 'secondary' : 'ghost'}
              size="icon"
              className="h-12 w-12"
            >
              {icon}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-4">
          {title}
          {label && (
            <span className="ml-auto text-muted-foreground">{label}</span>
          )}
          <IconChevronDown
            size={18}
            className="-rotate-90 text-muted-foreground"
          />
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent side="right" align="start" sideOffset={4}>
        <DropdownMenuLabel>
          {title} {label ? `(${label})` : ''}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sub!.map(({ title, icon, label, href, sub }) => (
          <>
            {sub ? (
              <>
                <DropdownMenuItem key={`${title}-${href}`} asChild>
                  <Link
                    to={'#'}
                    className={`${checkActiveUrl(href) ? 'bg-secondary' : ''}`}
                  >
                    {icon}{' '}
                    <span className="ml-2 max-w-52 text-wrap">{title}</span>
                    {label && <span className="ml-auto text-xs">{label}</span>}
                  </Link>
                </DropdownMenuItem>
                {sub!.map((list) => {
                  return (
                    <div className="ml-4">
                      <DropdownMenuItem
                        key={`${list.title}-${list.href}`}
                        asChild
                      >
                        <Link
                          to={list.href}
                          className={`${
                            checkActiveUrl(list.href) ? 'bg-secondary' : ''
                          }`}
                        >
                          {list.icon}{' '}
                          <span className="ml-2 max-w-52 text-wrap">
                            {list.title}
                          </span>
                          {list.label && (
                            <span className="ml-auto text-xs">
                              {list.label}
                            </span>
                          )}
                        </Link>
                      </DropdownMenuItem>
                    </div>
                  );
                })}
              </>
            ) : (
              <DropdownMenuItem key={`${title}-${href}`} asChild>
                <Link
                  to={href}
                  className={`${checkActiveUrl(href) ? 'bg-secondary' : ''}`}
                >
                  {icon}{' '}
                  <span className="ml-2 max-w-52 text-wrap">{title}</span>
                  {label && <span className="ml-auto text-xs">{label}</span>}
                </Link>
              </DropdownMenuItem>
            )}
          </>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
