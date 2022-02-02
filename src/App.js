import { useRef, useState } from 'react';
import classes from './style.scss';

function App() {

  const [ title, setTitle ] = useState(String);
  const [ links, setLinks ] = useState(String);
  const [ workspacess, setWorkspacess ] = useState([{title: '', links: ''}]);
  const [ activeWorkspace, setActiveWorkspace ] = useState(Number(-1));

  // const links = useRef();
  // links.current.value;

  function getLinks(){
    if ( JSON.parse(localStorage.getItem('data')) != null ) {
      setWorkspacess( JSON.parse(localStorage.getItem('data')) );
    } else {
      alert('No database found');
    }
  }
  // Control functions
  const changeTitle = (e) => {
    setTitle(e.target.value)
  }
  const changeLinks = (e) => {
    setLinks(e.target.value)
  }

  const saveLocalStorage = (actualWorkspace) => {
    localStorage.setItem("data", JSON.stringify(actualWorkspace));
  }

  const saveWorkspace = () => {
    // If existing workspace not selected create new
    const activeWorkspaceData = {title: title, links: links};
    const newWorkspaces = workspacess;
    console.log(activeWorkspace);
    if(activeWorkspace == -1) {
      newWorkspaces.push(activeWorkspaceData);
      setWorkspacess([...newWorkspaces]);
    } else {
      newWorkspaces[activeWorkspace] = activeWorkspaceData;
      setWorkspacess([...newWorkspaces]);
    }
    saveLocalStorage([...newWorkspaces]);
  }
  const controlDelete = () => {
    if ( activeWorkspace != -1 ) {
      if ( window.confirm('Are you sure you want to delete the workspace: '+workspacess[activeWorkspace].title) == true ) {
        const newWorkspaces = workspacess;
        newWorkspaces.splice(activeWorkspace,1);
        setWorkspacess([...newWorkspaces]);
        setActiveWorkspace( -1 );
      }
    } else {
      alert('Workspace not selected');
    }
  }
  const controlAddNew = () => {
    setActiveWorkspace( -1 );
    const newWorkspaces = workspacess;
    newWorkspaces.push({title: '', links: ''});
    setWorkspacess([...newWorkspaces]);
  }

  const changeWorkspace = (e) => {
    const newWorkspace = e.target.dataset.index;
    // Save workspace
    setActiveWorkspace(newWorkspace);
    // Change title and links
    if ( workspacess[newWorkspace].title.length > 0 ) {
      setTitle(workspacess[newWorkspace].title);
      setLinks(workspacess[newWorkspace].links);
    }
  }

  return (
    <div className="App">

      <div className='workspaces'>

        <div className='workspaces__controls'>

          <button onClick={ controlAddNew }>New</button>
          <button onClick={ controlDelete }>Delete</button>

        </div>

        { workspacess.map( (item, index) => (
          <div 
            className={ activeWorkspace == index ? 'workspaces__block active':'workspaces__block' } 
            key={ index }
            data-index={ index }
            onClick={ changeWorkspace }
          >{ item.title }</div>
        )) }

      </div>

      <div className='links'>
        <div className='links__controls'>
         
          <button onClick={ getLinks }>Load from database</button>
          <button onClick={ saveWorkspace }>Save</button>

        </div>
        <div className='links__area'>
          
          <input value={ title } onChange={ changeTitle }></input>
          <textarea value={ links } onChange={ changeLinks }></textarea>

        </div>
      </div>

    </div>
  );
}

export default App;
