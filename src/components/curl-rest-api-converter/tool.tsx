import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function CurlToRestApiConverterTool() {
  return (
    <div className="flex flex-col gap-4 p-6 h-full">
      {/* Page header */}
      <div className="flex flex-col gap-y-0.5">
        <h1 className="text-base font-medium">cURL to Rest API Converter</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Convert cURL to CXone Studio Rest Proxy format
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">Object name</span>
        <Input
          // value={objectName}
          // onChange={(e) => setObjectName(e.target.value)}
          className="w-24 h-8 font-mono text-xs"
          placeholder="obj"
        />
        <div className="flex-1" />
        <Button variant="outline" size="sm" onClick={() => {}}>
          Clear all
        </Button>
        <Button variant="outline" size="sm" onClick={() => {}}>
          Paste example
        </Button>
        <Button size="sm" onClick={() => {}}>
          Convert →
        </Button>
      </div>
    </div>
  );
}
