import express from 'express'
import { verifyToken } from '../verifyToken.js'
import { addVideo, addView, deleteVideo, getVideo, randomVideo, subbedVideo, trendingVideo, updateVideo } from '../controllers/video.controller.js'


const router = express.Router()

router.post('/',verifyToken,addVideo)
router.delete('/:id',verifyToken,deleteVideo)
router.put('/:id',verifyToken,updateVideo)
router.get('/find/:id',getVideo)
router.get('/view/:id',addView)
router.get('/trend',trendingVideo)
router.get('/random',randomVideo)
router.get('/subbedVideos',verifyToken,subbedVideo)
export default router