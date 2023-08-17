import React, { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { uploadBlogImgsApi } from "../../features/blog/blogThunk";
import { useSelector, useDispatch } from "react-redux";
import tinymce from "tinymce";
window.tinymce = tinymce;
import "@wiris/mathtype-tinymce6";

const EditorCom = ({setContent}) => {
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  //
  const upImg = (blobInfo, progress) =>
    new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("blogImage", blobInfo.blob(), blobInfo.filename());
      dispatch(uploadBlogImgsApi(formData))
        .then((response) => {
          resolve(response.payload.imgUrl);
        })
        .catch((error) => {
          console.log("error:", error);
        });
    });
  //

  //

  const onDrop =
    ((e) => {
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
    },
    []);

  const handleEditorChange = (e) => {
    const newContent = e.target.getContent();
   setContent(newContent);
  };
  return (
    <div>
      <Editor
        onDrop={onDrop}
        apiKey="y7gnmtbsaxnjbgh3405ioqbdm24eit5f0ovek49w8yvq5r9q"
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        initialValue=""
        init={{
          external_plugins: {
            tiny_mce_wiris: `${window.location.href}/node_modules/@wiris/mathtype-tinymce6/plugin.min.js`,
          },
          content_style:
            // img { display: block; margin-bottom: 10px; }
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px } img {display: block; margin: 0 auto; max-width: 50%; max-height: 50%;  } p{display: block;}",
          //  theme : "advanced",
          // force_br_newlines : false,
          // force_p_newlines : false,
          // forced_root_block : '',
          spellchecker_spellcheck_languages: "en,es,fr",
          paste_data_images: true,
          paste_as_text: true,
          branding: false,
          menubar: false,
          image_dimensions: false,
          selector: "textarea",
          images_upload_handler: upImg,
          // autoresize_max_height: 800,
          selector: "textarea",
          height: 288,
          // resize: false,
          min_height: 288,
          max_height: 1500,
          plugins:
            " autoresize print preview -paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern",

          toolbar:
            "formatselect | bold italic  link numlist bullist outdent indent image blockquote  table  media tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry undo redo ",
          // forced_root_block: false,
          //
          draggable_modal: true,
          extended_valid_elements: "*[.*]",
          //
          image_advtab: true,
          image_title: true,
          automatic_uploads: true,
          images_file_types: "image/*",
          file_picker_types: "file image media",
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
        onChange={handleEditorChange}
        // onChange={(e) => {
        //   props.setContent(e.target.getContent());
        // }}
        // onChange={(e) =>{console.log(e.target.getContent())}}
      />
    </div>
  );
};

export default EditorCom;
