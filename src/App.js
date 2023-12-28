import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import Background from "./assets/bg.jpg";
import './App.css';

export default function App() {
  const { editor, onReady } = useFabricJSEditor();

  const history = [];
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }

    editor.canvas.renderAll();
  }, [editor]);

  const addBackground = () => {
    if (!editor || !fabric) {
      return;
    }

    fabric.Image.fromURL(Background, (image) => {
      editor.canvas.setBackgroundImage(
        image,
        editor.canvas.renderAll.bind(editor.canvas)
      );
    });
  };


  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.setHeight(360);
    editor.canvas.setWidth(720);
    addBackground();
    editor.canvas.renderAll();
  }, [editor?.canvas.backgroundImage]);


  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.freeDrawingBrush.color = color;
    editor.setStrokeColor(color);
  }, [color]);

  const undo = () => {
    if (editor.canvas._objects.length > 0) {
      history.push(editor.canvas._objects.pop());
    }
    editor.canvas.renderAll();
  };
  const redo = () => {
    if (history.length > 0) {
      editor.canvas.add(history.pop());
    }
  };

  const newPage = () => {
    editor.canvas._objects.splice(0, editor.canvas._objects.length);
    history.splice(0, history.length);
    editor.canvas.renderAll();
  };

  const removeSelectedObject = () => {
    editor.canvas.remove(editor.canvas.getActiveObject());
  };

  const addText = () => {
    editor.addText("inset text");
  };

  return (
    <div className="App">
      <h1>Welcome to celebrare</h1>
      <h3>"Craft Your Love Story Online: Personalize, Share, and Cherish Every Moment with Our Digital Wedding Invite Editor!"</h3>
      
      <div className="buttons">
      
      <button onClick={newPage} >
        New
      </button>
      <button onClick={undo} >
        Undo
      </button>
      <button onClick={redo} >
        Redo
      </button>
      <button onClick={addText} >
        Add Text
      </button>
      <button onClick={removeSelectedObject} >
        Delete
      </button>
      <label >
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>
      </div>
      
      <div className="edit-area">
        <FabricJSCanvas className="sample-canvas" onReady={onReady} />
      </div>
      <h5> Copyright &copy; 2023 Celebrare. Designed and Developed by <a
        href="https://portfolio-amansingh.vercel.app/"> Aman Singh</a></h5>
      
    </div>
  );
}
