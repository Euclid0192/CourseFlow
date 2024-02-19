import "reactflow/dist/style.css";
import "./MainFeature.css"
import Flow from "../../ReactFlow/Flow"
import { useState } from "react";

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
    deleteNode,
    clear,
    generateFlow
  } = useNodeEdgeStore(selector)

  const [ title, setTitle ] = useState('') 

  /// Adding nodes
  const submitAddNode = () => {

    if (title !== "")
      addNode(title)

    setTitle("")
  }

  /// Add nodes on Enter
  const submitAddNodeOnEnter = (e: any) => {

    if (e.key === "Enter")
      submitAddNode()
  }

  /// Deleting nodes
  const submitDeleteNode = () => {

    if (title !== "" && title !== "New Node")
      deleteNode(title)

    setTitle("")
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
        <div>
          <label className="course">Course: 
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => submitAddNodeOnEnter(e)}></input>
          </label>
        </div>
        <div>
          <button className="btn" onClick={submitAddNode} >Add a new course</button>
          <button className="btn" onClick={submitDeleteNode}>Delete a course</button>
          <button className="btn" onClick={clear}>Clear Everything</button>
          <button className="btn" onClick={submitGenerate}>Generate CourseFlow</button>
        </div>
      </div>
      <Flow />
    </div>
  );
};

export default MainFeature;
