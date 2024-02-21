import "reactflow/dist/style.css";
import "./MainFeature.css"
import Flow from "../../ReactFlow/Flow"
import { useState } from "react";

import useNodeEdgeStore from "../../Zustand/storeRF";
import { GenerateFlow } from "../../Zustand/GenerateFlow";
import useAuthStore, { AuthState } from "../../Zustand/storeAuth";
import NamingModal from "../Modal/NamingModal";
import { useNavigate } from "react-router-dom";

const selector = (state: any) => ({
  addNode: state.addNode,
  deleteNode: state.deleteNode,
  clear: state.clear,
  generateFlow: state.generateFlow
});

const authSelector = (state: AuthState) => ({
  username: state.username
})


const MainFeature = () => {

  const navigate = useNavigate()

  const {
    addNode,
    deleteNode,
    clear,
    generateFlow
  } = useNodeEdgeStore(selector)

  const { 
    username
  } = useAuthStore(authSelector)

  const [ title, setTitle ] = useState('') 
  const [ modalVisible, setModalVisible ] = useState(false)

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

  /// Save new flow (updated flow)
  const submitSaveFlow = async () => {

    if (!username)
    {
      console.log("Not logged in yet...")
      alert("You need to log in or sign up to save your flow")
      navigate("/auth/login")
    }

    // console.log("Current nodes...", nodes)
    // console.log("Current edges...", edges)

    // /// convert nodes and edges to BE schema
    // const nodesList = nodes.map((ele: any) => ({
    //   nodeId: ele.id,
    //   title: ele.data.label,
    //   type: ele.type,
    //   position: ele.position
    // })) 

    // console.log("nodes for BE, ", nodesList)

    // const edgesList = edges.map((ele: any) => ({
    //   source: Number(ele.source),
    //   destination: Number(ele.target)
    // }))

    // console.log("edges for BE, ", edgesList)


    setModalVisible(true)

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
          <button className="btn" onClick={submitSaveFlow}>Save Flow</button>
          <NamingModal isOpen={modalVisible} onClose={() => setModalVisible(false)} />
        </div>
      </div>
      <Flow />
    </div>
  );
};

export default MainFeature;
