import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import toast, { Toaster } from 'react-hot-toast';
import styles from './TextEditor.module.css';
import { onSubmit, onUpdate } from '../../lib/postActions';
import draftToHtml from 'draftjs-to-html';
import { validPost } from '../../lib/validator';
import { useRouter } from 'next/router';
import kebabCase from '../../lib/kebabCase';
import { UploadButton } from '@uploadthing/react';

let htmlToDraft = null;
if (typeof window === 'object') {
  htmlToDraft = require('html-to-draftjs').default;
}

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  { ssr: false }
);

export default function TextEditor({ post, userId, collections, postCollIdx }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [summary, setSummary] = useState('');
  const [isCollection, setIsCollection] = useState(
    post?.collectionId ? true : false
  );
  const [isNewCollection, setIsNewCollection] = useState(false);
  const [collectionData, setCollectionData] = useState({
    name: collections.length === 0 ? '' : collections[postCollIdx]?.name,
    image: '',
    description: '',
  });

  const [editorState, setEditorState] = useState(() => {
    if (router.pathname === '/admin/fabo/new') {
      return EditorState.createEmpty();
    } else if (router.asPath === `/${router.query.slug}/edit`) {
      setTitle(post.title);
      setThumbnail(post.thumbnail);
      setSummary(post.summary);
      const html = post.content;
      const contentBlock = htmlToDraft(html);
      const contentState = ContentState.createFromBlockArray(contentBlock);
      return EditorState.createWithContent(contentState);
    }
  });

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleIsCollection = (e) => {
    const isCollection = e.target;
    if (isCollection.checked) setIsCollection(true);
    else {
      setIsCollection(false);
      setIsNewCollection(false);
      setCollectionData({
        name: collections.length === 0 ? '' : collections[0].name,
        description: '',
        image: '',
      });
    }
  };

  const publish = (e) => {
    e.preventDefault();
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    if (
      validPost(title, thumbnail) &&
      editorState.getCurrentContent().hasText()
    ) {
      const postData = {
        title,
        thumbnail,
        content,
        summary,
        userId,
        isCollection,
        isNewCollection,
        ...collectionData,
      };
      onSubmit(postData);
      setTimeout(() => {
        router.push(`/${kebabCase(title)}`);
      }, 2000);
    } else {
      toast.error('Must provide text');
    }
  };

  const update = (e) => {
    e.preventDefault();
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    if (
      validPost(title, thumbnail) &&
      editorState.getCurrentContent().hasText()
    ) {
      const postId = post.id;
      const data = {
        title,
        thumbnail,
        content,
        summary,
        postId,
        userId,
        isCollection,
        isNewCollection,
        ...collectionData,
      };
      onUpdate(data);
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  };

  return (
    <div className={styles.container}>
      <form id='form'>
        <div className={styles.collections}>
          <label htmlFor='isCollection'>Part of a Collection?</label>
          <input
            id='isCollection'
            type='checkbox'
            checked={isCollection}
            onChange={handleIsCollection}
          />
        </div>
        <div
          className={styles.lowerColl}
          style={{ borderBottom: isCollection ? '1px solid #dedede' : 'none' }}
        >
          {isCollection && (
            <div
              style={{
                display: isNewCollection ? 'block' : 'flex',
                gap: '0.5rem',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <div className={styles.newCollection}>
                <label htmlFor='isNew'>Is this a new Collection?</label>
                <input
                  id='isNew'
                  type='checkbox'
                  checked={isNewCollection}
                  onChange={() => {
                    setCollectionData({ ...collectionData, name: '' });
                    setIsNewCollection(!isNewCollection);
                  }}
                />
              </div>
              {isNewCollection ? (
                <div style={{ marginTop: '0.5rem' }}>
                  <div className={styles.collectionData}>
                    <input
                      type='text'
                      onChange={(e) =>
                        setCollectionData({
                          ...collectionData,
                          name: e.target.value,
                        })
                      }
                      placeholder='Collection name'
                      value={collectionData.name}
                      style={{ width: '100%' }}
                    />
                    {collectionData.image.includes('utfs.io') ? (
                      <input
                        style={{ width: '100%' }}
                        value={collectionData.image}
                        onChange={(e) =>
                          setCollectionData({
                            ...collectionData,
                            image: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <UploadButton
                        endpoint='imageUploader'
                        appearance={{
                          button({ isUploading }) {
                            return {
                              backgroundColor: '#0a9e01',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '1.25rem',
                              width: '100%',
                              ...(isUploading && {
                                backgroundColor: '#15803d',
                              }),
                            };
                          },
                          container: {
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                          },
                          allowedContent: {
                            display: 'none',
                          },
                        }}
                        onClientUploadComplete={(res) => {
                          setCollectionData({
                            ...collectionData,
                            image: res[0].url,
                          });
                        }}
                      />
                    )}
                  </div>
                  <textarea
                    onChange={(e) =>
                      setCollectionData({
                        ...collectionData,
                        description: e.target.value,
                      })
                    }
                    placeholder='Collection description'
                    value={collectionData.description}
                    style={{
                      width: '100%',
                      resize: 'none',
                      marginBottom: '1rem',
                    }}
                    rows={4}
                  />
                </div>
              ) : (
                <select
                  defaultValue={collectionData.name}
                  onChange={(e) =>
                    setCollectionData({
                      ...collectionData,
                      name: e.target.value,
                    })
                  }
                  style={{
                    marginLeft: '0.5rem',
                    padding: '0.25rem',
                    backgroundColor: 'white',
                    fontSize: '1rem',
                  }}
                >
                  {collections.map((coll) => (
                    <option
                      style={{ padding: '0.25rem' }}
                      key={coll.id}
                      value={coll.name}
                    >
                      {coll.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}
        </div>
        <div className={styles.top}>
          <div className={styles.formDiv}>
            <label className={styles.title} htmlFor='title'>
              Title
            </label>
            <input
              className={styles.input}
              id='title'
              name='title'
              type='text'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>
          <div className={styles.uploader}>
            <label htmlFor='thumbnail' className={styles.title}>
              Thumbnail URL - Minimum Resolution 1280 x 720
            </label>
            {thumbnail.includes('utfs.io') ? (
              <input
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
              />
            ) : (
              <UploadButton
                endpoint='imageUploader'
                appearance={{
                  button({ isUploading }) {
                    return {
                      backgroundColor: '#0a9e01',
                      border: 'none',
                      cursor: 'pointer',
                      width: '100%',
                      fontSize: '1.25rem',
                      ...(isUploading && { backgroundColor: '#15803d' }),
                    };
                  },
                  container: {
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                  },
                  allowedContent: {
                    display: 'none',
                  },
                }}
                onClientUploadComplete={(res) => {
                  setThumbnail(res[0].url);
                }}
              />
            )}
          </div>
        </div>
        <div className={styles.summary}>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={5}
            required
            placeholder='Write a short preview summary'
          ></textarea>
        </div>
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbarClassName='toolbar-class'
        />
        {router.pathname === '/admin/new' && (
          <div className={styles.btnDiv}>
            <button
              type='submit'
              onClick={publish}
              className={styles.submitBtn}
            >
              ADD POST
            </button>
          </div>
        )}
        {router.asPath === `/${router.query.slug}/edit` && (
          <div className={styles.btnDiv}>
            <button type='submit' onClick={update} className={styles.submitBtn}>
              UPDATE
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
