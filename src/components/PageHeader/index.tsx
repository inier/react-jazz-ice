import React from 'react';

import { Breadcrumb, Box, Typography } from '@alifd/next';

import styles from './index.module.scss';

export interface PageHeaderProps {
  breadcrumbs?: Array<{ name: string; path?: string }>;
  title?: string;
  description?: string;
}

const PageHeader = (props: PageHeaderProps)                     => {
  const { breadcrumbs, title, description, ...others } = props;
  return (
    <Box spacing={8} className={styles.PageHeader} {...others}>
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <Breadcrumb className={styles.Breadcrumbs} separator=" / ">
          {breadcrumbs.map((item, idx) => {
            const key = `${idx}-${item.path}`;

            return (
              <Breadcrumb.Item key={key} link={item.path}>
                {item.name}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      ) : null}

      {title && <Typography.Text className={styles.Title}>{title}</Typography.Text>}

      {description && <Typography.Text className={styles.Description}>{description}</Typography.Text>}
    </Box>
  );
};

PageHeader.displayName = 'PageHeader';

export default PageHeader;
