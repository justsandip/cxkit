import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import JsonToDynamicConverterTool from '@/components/json-dynamic-converter/tool';

function App() {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="cxkit-ui-theme">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
            </header>
            <JsonToDynamicConverterTool />
          </SidebarInset>
        </SidebarProvider>
      </ThemeProvider>
      <Toaster />
    </div>
  );
}

export default App;
