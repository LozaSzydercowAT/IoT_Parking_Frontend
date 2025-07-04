import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FluentProvider, webDarkTheme } from "@fluentui/react-components";
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <FluentProvider theme={webDarkTheme}>
        <StrictMode>
            <App />
        </StrictMode>
    </FluentProvider>
)
