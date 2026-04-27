import * as ReactDOM from 'react-dom/client';
import '@/index.css';
import RootApp from '@/root-app';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);
root.render(<RootApp />);
