import "reactflow/dist/style.css";
import "./MainFeature.css"
import Flow from "../../ReactFlow/Flow"
import { useRef, useState } from "react";

import useNodeEdgeStore from "../../Zustand/storeRF";
import { GenerateFlow } from "../../Zustand/GenerateFlow";

const selector = (state: any) => ({
  addNode: state.addNode,
  deleteNode: state.deleteNode,
  clear: state.clear,
  generateFlow: state.generateFlow
});

const MainFeature = () => {

  const {
    addNode,
    clear,
    generateFlow
  } = useNodeEdgeStore(selector)

  const [ title, setTitle ] = useState('') 
  const onDelete = useRef(false)


  /// Adding nodes
  const submitAddNode = (evt: any) => {
    evt.preventDefault()
    if (title !== "")
      addNode(title)

    setTitle("")
  }

  /// Deleting nodes
  const submitDeleteNode = () => {
    onDelete.current = true
  }

  /// Generate flow
  const submitGenerate = () => {
    let flow: String[] = []
    if (title)
      flow = GenerateFlow(title)

    generateFlow(flow)
    setTitle("")
  }

  return (
    <div className="container">
      <div className="header">
        <form onSubmit={submitAddNode}>
          <label>Course: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input></label>
          <button className="btn" type="submit" >Add a new course</button>
        </form>
        <button className="btn" onClick={clear}>Clear Everything</button>
        <button className="btn" onClick={submitDeleteNode}>Delete a course</button>
        <button className="btn" onClick={submitGenerate}>Generate CourseFlow</button>
      </div>
      <Flow onDelete={onDelete} />
    </div>
  );
};

export default MainFeature;
