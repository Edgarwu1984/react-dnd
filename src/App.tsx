import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Container from './components/exampleA/Container';
import Shelf from './components/exampleB/ShelfSystem';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <DndProvider backend={HTML5Backend}>
        <h1>Example 1</h1>
        <Container />
        <h1>Example 2</h1>
        <Shelf />
      </DndProvider>
    </div>
  );
}

export default App;
