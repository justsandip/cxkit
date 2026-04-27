import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { SyntaxReference } from '@/components/json-dynamic-converter/syntax-reference';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

const EXAMPLE = JSON.stringify(
  {
    name: 'Adeel Solangi',
    language: 'Sindhi',
    id: 'V590F92YF627HFY0',
    skills: [{ name: 'JavaScript' }, { name: 'Python' }],
  },
  null,
  2,
);

function flattenJSON(obj: unknown, prefix: string, lines: string[]) {
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => flattenJSON(item, `${prefix}[${i + 1}]`, lines));
  } else if (obj !== null && typeof obj === 'object') {
    Object.entries(obj as Record<string, unknown>).forEach(([key, val]) => {
      flattenJSON(val, `${prefix}.${key}`, lines);
    });
  } else {
    const value = typeof obj === 'string' ? `"${obj}"` : String(obj);
    lines.push(`${prefix} = ${value}`);
  }
}

function convertToDynamic(json: string, objectName: string): string {
  const parsed = JSON.parse(json);
  const lines: string[] = [`DYNAMIC ${objectName}`, ''];
  if (Array.isArray(parsed)) {
    parsed.forEach((item, i) => flattenJSON(item, `${objectName}[${i + 1}]`, lines));
  } else {
    Object.entries(parsed as Record<string, unknown>).forEach(([key, val]) => {
      flattenJSON(val, `${objectName}.${key}`, lines);
    });
  }
  return lines.join('\n');
}

function getStats(output: string) {
  if (!output) return null;
  const lines = output.split('\n');
  return {
    assignments: lines.filter((l) => l.includes('=')).length,
    lines: lines.length,
  };
}

export default function JsonToDynamicConverterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [objectName, setObjectName] = useState('obj');
  const [error, setError] = useState('');

  const convert = useCallback(() => {
    if (!input.trim()) return;
    try {
      setOutput(convertToDynamic(input, objectName || 'obj'));
      setError('');
    } catch {
      setError('Invalid JSON — check your input and try again.');
      setOutput('');
    }
  }, [input, objectName]);

  const format = useCallback(() => {
    try {
      setInput(JSON.stringify(JSON.parse(input), null, 2));
      setError('');
    } catch {
      setError('Cannot format — invalid JSON.');
    }
  }, [input]);

  const copy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard');
  }, [output]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
  }, []);

  const stats = getStats(output);

  return (
    <div className="flex flex-col gap-4 p-6 h-full">
      {/* Page header */}
      <div className="flex flex-col gap-y-0.5">
        <h1 className="text-base font-medium">JSON to Dynamic Converter</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Convert JSON to CXone Studio DYNAMIC format
        </p>
      </div>

      {/* Syntax reference */}
      <SyntaxReference />

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">Object name</span>
        <Input
          value={objectName}
          onChange={(e) => setObjectName(e.target.value)}
          className="w-24 h-8 font-mono text-xs"
          placeholder="obj"
        />
        <div className="flex-1" />
        <Button variant="outline" size="sm" onClick={clearAll}>
          Clear all
        </Button>
        <Button variant="outline" size="sm" onClick={() => setInput(EXAMPLE)}>
          Paste example
        </Button>
        <Button size="sm" onClick={convert}>
          Convert →
        </Button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      {/* Editors */}
      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
        {/* Input panel */}
        <div className="border rounded-lg flex flex-col overflow-hidden min-h-0">
          <div className="flex items-center gap-2 px-4 py-2 border-b bg-background shrink-0">
            <span className="text-xs font-medium flex-1">Input JSON</span>
            <Button variant="ghost" size="sm" className="h-6 text-[11px] px-2" onClick={format}>
              Format
            </Button>
            <Separator orientation="vertical" className="h-3 self-center" />
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-[11px] px-2"
              onClick={() => setInput('')}
            >
              Clear
            </Button>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={'Paste your JSON here...\n\n{\n  "name": "John Doe"\n}'}
            className="flex-1 resize-none font-mono text-xs rounded-none border-0 bg-muted/40 focus-visible:ring-0 min-h-0"
          />
          <div className="px-4 py-2 border-t bg-background shrink-0">
            <span className="text-[11px] text-muted-foreground">
              {input ? `${input.split('\n').length} lines` : '0 lines'}
            </span>
          </div>
        </div>

        {/* Output panel */}
        <div className="border rounded-lg flex flex-col overflow-hidden min-h-0">
          <div className="flex items-center gap-2 px-4 py-2 border-b bg-background shrink-0">
            <span className="text-xs font-medium flex-1">Dynamic output</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-[11px] px-2"
              onClick={copy}
              disabled={!output}
            >
              Copy
            </Button>
          </div>
          <pre className="flex-1 font-mono text-xs bg-muted/40 p-4 overflow-auto whitespace-pre min-h-0">
            {output ? (
              output
            ) : (
              <span className="text-muted-foreground italic">Output will appear here...</span>
            )}
          </pre>
          <div className="px-4 py-2 border-t bg-background shrink-0 flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">
              {stats ? `${stats.assignments} assignments · ${stats.lines} lines` : '0 assignments'}
            </span>
            {output && (
              <Button
                variant="outline"
                size="sm"
                className="h-6 text-[11px] px-2 text-blue-500 border-blue-300 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950"
                onClick={copy}
              >
                Copy to clipboard
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
