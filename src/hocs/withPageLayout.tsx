import DashboardLayout from '@/layouts/DashboardLayout';
import GeneralLayout from '@/layouts/GeneralLayout';
import MobileLayout from '@/layouts/MobileLayout';
import PrivateRoute from '@/routes/PrivateRoute';
import React from 'react';

type LayoutType = 'general' | 'dashboard' | 'none' | 'mobile'; // 'none' for pages that manage their own full layout

interface WithPageLayoutOptions {
  layoutType?: LayoutType;
  isPrivate?: boolean;
}

export function withPageLayout<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithPageLayoutOptions = {}
) {
  const { layoutType = 'general', isPrivate = false } = options;

  const ComponentWithLayout = (props: P) => {
    const PageContent = <WrappedComponent {...props} />;

    const AuthenticatedPageContent = isPrivate ? (
      <PrivateRoute>{PageContent}</PrivateRoute>
    ) : (
      PageContent
    );

    if (layoutType === 'mobile') {
      return <MobileLayout>{AuthenticatedPageContent}</MobileLayout>;
    }

    if (layoutType === 'dashboard') {
      return <DashboardLayout>{AuthenticatedPageContent}</DashboardLayout>;
    }

    if (layoutType === 'general') {
      return <GeneralLayout>{AuthenticatedPageContent}</GeneralLayout>;
    }

    return AuthenticatedPageContent;
  };

  return ComponentWithLayout;
}
