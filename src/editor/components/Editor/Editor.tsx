import React from 'react';

interface IEditorProps {
  cap?: string;
}

export const Editor: React.FC<IEditorProps> = () => {
	return <div style={{ border: '1px solid grey', height: '300px' }}>Test</div>;
};
