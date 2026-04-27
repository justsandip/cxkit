import AppLayout from '@/components/app-layout';
import JsonToDynamicConverterTool from '@/components/json-dynamic-converter/tool';
import { Route, Routes } from 'react-router';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/utilities/json-dynamic-converter" element={<JsonToDynamicConverterTool />} />
      </Route>
    </Routes>
  );
}
