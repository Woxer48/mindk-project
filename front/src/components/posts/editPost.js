import React from 'react';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import {
  Button, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField,
} from '@mui/material';
import { editPost } from '../../containers/posts/api/crud';
import postsProps from '../../PropTypes/postsProps';

export function EditPost({
  post,
}) {
  const schema = Yup.object().shape({
    creatorId: Yup.number().required().positive().integer(),
    availability: Yup.string().required(),
    text: Yup.string().required(),
  });

  const mutateHook = useMutation(
    (data) => editPost(post[0].postId, data),
  );

  const onFormSubmit = (formData) => {
    alert('Post was edited successfully!');
    mutateHook.mutate(formData);
  };

  const formik = useFormik({
    initialValues: {
      availability: post[0].availability,
      creatorId: post[0].creatorId,
      text: post[0].text,
    },
    validationSchema: schema,
    onSubmit: (data) => onFormSubmit(data),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <p>
        Edit post №
        {post[0].postId}
      </p>
      <p>
        Enter ID of the post creator in the field below:
      </p>
      <TextField
        id="outlined-basic"
        name="creatorId"
        label="Creator ID"
        variant="outlined"
        onChange={formik.handleChange}
        value={formik.values.creatorId}
      />
      <p>
        Select post availability:
      </p>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Availability</InputLabel>
        <Select
          id="demo-simple-select-autowidth"
          labelId="demo-simple-select-autowidth-label"
          name="availability"
          label="Availability"
          onChange={formik.handleChange}
          value={formik.values.availability}
        >
          <MenuItem value="for all">For all</MenuItem>
          <MenuItem value="for friends">For friends</MenuItem>
          <MenuItem value="for me">For me</MenuItem>
        </Select>
      </FormControl>
      <p>
        Enter text of the post in the field below:
      </p>
      <TextareaAutosize
        name="text"
        aria-label="minimum height"
        minRows={4}
        placeholder="Your post text..."
        style={{
          width: 200,
          marginBottom: '10px',
        }}
        onChange={formik.handleChange}
        value={formik.values.text}
      />
      <br />
      <Button variant="outlined" type="submit">Edit post</Button>
    </form>
  );
}

EditPost.propTypes = postsProps;