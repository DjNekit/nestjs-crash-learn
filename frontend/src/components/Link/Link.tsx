import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

interface LinkProps extends Omit<ChakraLinkProps, 'as'> {
  children: ReactNode
}

export const Link = (props: LinkProps ) => {
  return (
    <ChakraLink as={NextLink} {...props}>
      {props.children}
    </ChakraLink>
  )
}