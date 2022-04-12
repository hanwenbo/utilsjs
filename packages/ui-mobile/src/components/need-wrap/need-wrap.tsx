import React from 'react';

export type NeedWrapProps = {
  wrap: React.ComponentType;
  children: React.ReactNode;
  wrapProps?: any;
  need: boolean;
}

export const NeedWrap = ({
                           wrap: Wrap,
                           children,
                           wrapProps,
                           need,
                         }: NeedWrapProps) => {
  return need ? (
    <Wrap {...wrapProps}>
      {children}
    </Wrap>
  ) : (
    (children as any) || null
  );
};
