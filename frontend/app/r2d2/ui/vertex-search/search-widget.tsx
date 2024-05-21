import React, { useEffect } from 'react';
import { Button } from "../button";


export default function SearchWidget( { configId }: { configId: string} ) {
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <!-- Widget JavaScript bundle -->
            <script src="https://cloud.google.com/ai/gen-app-builder/client?hl=en_US"></script>
            
            <!-- Search widget element is not visible by default -->
            <gen-search-widget
              configId=${configId}
              triggerId="searchWidgetTrigger" autoOpen>
            </gen-search-widget>
            
          `,
        }}
      />
    <Button 
        id="searchWidgetTrigger"
        style={{ backgroundColor: 'lightgrey', color: 'black' }}>
            Vertex Search
    </Button>
    </>
  );
}