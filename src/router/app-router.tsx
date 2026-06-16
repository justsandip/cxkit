import AppLayout from '@/components/app-layout';
import CurlToRestApiConverterTool from '@/components/curl-rest-api-converter/tool';
import JsonToDynamicConverterTool from '@/components/json-dynamic-converter/tool';
import { Route, Routes } from 'react-router';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/utilities/json-dynamic-converter" element={<JsonToDynamicConverterTool />} />
        <Route path="/utilities/curl-rest-api-converter" element={<CurlToRestApiConverterTool />} />
      </Route>
    </Routes>
  );
}
