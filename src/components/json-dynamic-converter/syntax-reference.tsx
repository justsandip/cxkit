const syntaxRules = [
  {
    tag: 'declare',
    code: 'DYNAMIC obj',
    note: 'once, before assignments',
    tagClass: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  },
  {
    tag: 'assign',
    code: 'obj.property = "value"',
    note: 'dot notation',
    tagClass: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
  },
  {
    tag: 'array',
    code: 'obj.items[1].name = "x"',
    note: '1-based, not 0',
    tagClass: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  },
];

export function SyntaxReference() {
  return (
    <div className="rounded-lg border divide-y text-sm">
      {syntaxRules.map(({ tag, code, note, tagClass }) => (
        <div key={tag} className="flex items-center gap-4 px-4 py-2.5">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded w-20 text-center shrink-0 ${tagClass}`}
          >
            {tag}
          </span>
          <code className="font-mono flex-1 text-foreground">{code}</code>
          <span className="text-xs text-muted-foreground shrink-0">{note}</span>
        </div>
      ))}
    </div>
  );
}
