import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router';
import { TooltipProvider } from '@/components/ui/tooltip';
import CXKitEntry from '@/cx-kit-entry';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

export default function RootApp() {
  return (
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="cxkit-ui-theme">
        <BrowserRouter>
          <TooltipProvider>
            <CXKitEntry />
            <Toaster />
          </TooltipProvider>
        </BrowserRouter>
      </ThemeProvider>
    </StrictMode>
  );
}
