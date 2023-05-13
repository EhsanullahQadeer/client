import React,{useRef} from "react";
import { Editor } from "@tinymce/tinymce-react";
// import { Global } from "@emotion/core";

const EditorCom = (props) => {
  const editorRef = useRef(null);
  const onDrop = ((e) => {
    const image_url = e.dataTransfer.getData("URL");
    
    /*
        If this is a local file, use the default functionality
        provided using images_upload_url
      */
    if (!image_url) {
      return;
    }
    
    /*
        Otherwise, intercept the drop event, get the file URL,
        send it to the API to be uploaded, then embed in content
      */
    
    e.preventDefault();
    
    filesAPI
      .upload({
        image_url,
      })
      .then((response) => {
        const { location } = response.data;
        editorRef.current.execCommand(
          "mceInsertContent",
          false,
          `<img src='${location}' />`
        );
      });
    
    return false;
    }, []);

  // props.content
  // props.setContent()
  
  return (
    <div>
      <Editor 
      onDrop={onDrop}
        apiKey="y7gnmtbsaxnjbgh3405ioqbdm24eit5f0ovek49w8yvq5r9q"
        onInit={(evt, editor) => {
              editorRef.current = editor
          }}
        initialValue=""
        init={{
          content_style:
         'body { font-family:Helvetica,Arial,sans-serif; font-size:14px } img { width: 120px; height:120px; }',
          branding: false,
          menubar: false,
          image_dimensions: false,
          // autoresize_max_height: 800,
          selector: "textarea", 
          height:288,
          // resize: false,
          min_height:288,
          max_height:1500, 
          plugins:
            "autoresize print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern",
            // underline
            // strikethrough forecolor backcolor removeformat alignleft aligncenter alignright alignjustify 

          toolbar:
            "formatselect | bold italic  link numlist bullist outdent indent image blockquote  table  media undo redo ",
          image_advtab: true,
          image_title: true,
          automatic_uploads: true,
          images_file_types: 'image/*',
          file_picker_types: 'file image media',
          block_unsupported_drop: true,
          file_picker_callback: function (cb, value, meta) {
              var input = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");
              input.onchange = function () {
                var file = this.files[0];

                var reader = new FileReader();
                reader.onload = function () {
                  var id = "blobid" + new Date().getTime();
                  var blobCache = editorRef.current.editorUpload.blobCache;
                  var base64 = reader.result.split(",")[1];
                  var blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);

                  /* call the callback and populate the Title field with the file name */
                  cb(blobInfo.blobUri(), { title: file.name });
                };
                reader.readAsDataURL(file);
              };
              input.click();
            },
  
        }}
        onChange={(e) =>{props.setContent(e.target.getContent())}}
      />
    </div>
  );
};

export default EditorCom;


