import "reactflow/dist/style.css";
import "./MainFeature.css"
import Flow from "../../ReactFlow/Flow"
import { useState, useEffect } from "react";

import useNodeEdgeStore from "../../Zustand/storeRF";
import { GenerateFlow } from "../../Zustand/GenerateFlow";
import useAuthStore, { AuthState } from "../../Zustand/storeAuth";
import NamingModal from "../Modal/NamingModal";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Node,
  Edge
} from 'reactflow'
import { nanoid } from "nanoid";
import axiosInstance from "../../configs/axios";

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  addNode: state.addNode,
  deleteNode: state.deleteNode,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  clear: state.clear,
  generateFlow: state.generateFlow,
  accessToken: state.accessToken
});

const authSelector = (state: AuthState) => ({
  username: state.username
})


const MainFeature = () => {

  const navigate = useNavigate()

  const {
    nodes, 
    edges,
    addNode,
    deleteNode,
    setNodes, 
    setEdges,
    clear,
    generateFlow,
    accessToken
  } = useNodeEdgeStore(selector)

  const { state } = useLocation()

  /// if flowId exists, in edit mode, access from account
  const getEditFlow = () => {
    if (state)
    {

      const { nodes, edges } = state 

      console.log(state)

      type Position = {
        x: number,
        y: number
      }
      /// node type from BE
      type BENode = {
        nodeId: string,
        title: string,
        type: string,
        position: Position 
      }

      type BEEdge = {
        source: string,
        destination: string,
      }

      /// transform to Nodes RF
      const Nodes = nodes.map((nd: BENode) => {
        const { nodeId, title, type, position } = nd 

        const newNode: Node = {
          id: nodeId,
          data: { label: title},
          position,
          type,
          dragHandle: type == 'usersCreated'? '.custom-drag-handle' : ''
        } 

        return newNode
      })

      /// transform to Edges RF
      const Edges: Edge[] = edges.map((ed: BEEdge) => {
        const { source, destination } = ed 

        const newEdge: Edge = {
          id: nanoid(),
          source,
          target: destination,
        }

        return newEdge
      })
      
      /// Update the flow
      setNodes(Nodes)
      setEdges(Edges)      
    }
  }
  
  useEffect(() => {
    getEditFlow()
  }, [state])


  const { 
    username
  } = useAuthStore(authSelector)

  const [ nodeTitle, setNodeTitle ] = useState('') 
  const [ modalVisible, setModalVisible ] = useState(false)

  /// Adding nodes
  const submitAddNode = () => {

    if (nodeTitle !== "")
      addNode(nodeTitle)

    setNodeTitle("")
  }

  /// Add nodes on Enter
  const submitAddNodeOnEnter = (e: any) => {

    if (e.key === "Enter")
      submitAddNode()
  }

  /// Deleting nodes
  const submitDeleteNode = () => {

    if (nodeTitle !== "" && nodeTitle !== "New Node")
      deleteNode(nodeTitle)

    setNodeTitle("")
  }

  /// Generate flow
  const submitGenerate = () => {
    let flow: String[] = []
    if (nodeTitle)
      flow = GenerateFlow(nodeTitle)

    generateFlow(flow)
    setNodeTitle("")
  }

  /// Save new flow (updated flow)
  const submitSaveFlow = async () => {

    if (!username)
    {
      alert("You need to log in or sign up to save your flow")
      navigate("/auth/login")
    }

    /// new flow -> Save
    if (!state)
      setModalVisible(true)
    /// former flow -> update
    else {
      const { flowId, title } = state
      const nodesList = nodes.map((ele: any) => ({
        nodeId: ele.id,
        title: ele.data.label,
        type: ele.type,
        position: ele.position
      })) 
  
      console.log("nodes for BE, ", nodesList)
  
      const edgesList = edges.map((ele: any) => ({
        source: Number(ele.source),
        destination: Number(ele.target)
      }))
  
      console.log("edges for BE, ", edgesList)

      /// submit the save to server
      try {
          const response = await axiosInstance.patch('/flows',
              {
                  id: flowId,
                  user: username,
                  title,
                  nodes: nodesList,
                  edges: edgesList,
              },
              {
                  headers: {
                      Authorization: 'Bearer ' + accessToken
                  }
              }
          )

          console.log("Response from saving...", response)

          navigate('/user')
          
      } catch (err: any) {
          console.log("error while saving...", err)
      }
    }

  }

  return (
    <div className="container">
      <div className="header">
        <div>
          <label className="course">Course: 
            <input type="text" value={nodeTitle} onChange={(e) => setNodeTitle(e.target.value)} onKeyDown={(e) => submitAddNodeOnEnter(e)}></input>
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
