'use client'; // Mark this as a client component

import { useState } from 'react';
import { CaseOption, JsonToNestJsDtoService } from '../utils/jsonToNestJsDto';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const Home = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [className, setClassName] = useState('');
  const [result, setResult] = useState('');
  const [addClassValidators, setAddClassValidators] = useState(false);
  const [addSwaggerAnnotations, setAddSwaggerAnnotations] = useState(false);
  const [caseOption, setCaseOption] = useState<CaseOption>('camelCase');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const service = new JsonToNestJsDtoService();
    try {
      const jsonObject = JSON.parse(jsonInput);
      let dtoClassContent = service.convert(jsonObject, className, {
        addClassValidators,
        addSwaggerAnnotations,
        caseOption,
      });
      setResult(dtoClassContent);
    } catch (error) {
      console.error(error);
      setResult('Invalid JSON input');
    }
  };

  const handleCopy = () => {
    enqueueSnackbar('Copied', {
      variant: 'default',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      autoHideDuration: 2000,
      style: {
        backgroundColor: 'black',
        color: 'white',
      },
    });
  };

  const splitClasses = (result: string): string[] => {
    return result.split('\nexport class').map((cls, index) => (index === 0 ? cls : 'export class' + cls));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full w-full bg-white shadow-md rounded-md overflow-hidden flex flex-col lg:flex-row h-[90vh]">
        <div className="w-full lg:w-1/2 p-6 space-y-4 h-full overflow-y-auto">
          <h2 className="text-lg ">Convert JSON to NestJS DTO</h2>
          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col h-full">
            <div className="flex-grow">
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full h-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="Enter JSON here"
                style={{ fontFamily: 'monospace' }}
              />
            </div>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder="Class Name"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={addClassValidators}
                  onChange={(e) => setAddClassValidators(e.target.checked)}
                />
                <span>Add Class Validators</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={addSwaggerAnnotations}
                  onChange={(e) => setAddSwaggerAnnotations(e.target.checked)}
                />
                <span>Add Swagger Annotations</span>
              </label>
              <FormControl>
                <Select
                  labelId="case-label"
                  value={caseOption}
                  onChange={(e) => setCaseOption(e.target.value as CaseOption)}
                >
                  <MenuItem value="camelCase">Camel Case</MenuItem>
                  <MenuItem value="snake_case">Snake Case</MenuItem>
                  <MenuItem value="kebab-case">Kebab Case</MenuItem>
                  <MenuItem value="PascalCase">Pascal Case</MenuItem>
                  <MenuItem value="CONSTANT_CASE">Constant Case</MenuItem>
                </Select>
              </FormControl>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Convert
            </button>
          </form>
        </div>
        <div className="w-full lg:w-1/2 p-6 bg-gray-50 overflow-y-auto h-full">
          <h3 className="text-lg  mb-4">Generated DTO Class</h3>
          {result ? (
            splitClasses(result).map((cls, index) => (
              <div key={index} className="relative group mb-4">
                <CopyToClipboard text={cls} onCopy={handleCopy}>
                  <button className="absolute right-2 top-2 text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    Copy
                  </button>
                </CopyToClipboard>
                <SyntaxHighlighter language="typescript" style={vscDarkPlus} showLineNumbers>
                  {cls}
                </SyntaxHighlighter>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Output will be shown here...</p>
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <SnackbarProvider maxSnack={3}>
    <Home />
  </SnackbarProvider>
);

export default App;
